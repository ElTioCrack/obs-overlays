"""Panel de control de los overlays: sirve la carpeta y guarda shared/config.js. Solo escucha en este PC."""
import json, os, re, webbrowser
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CFG = os.path.join(ROOT, "shared", "config.js")
PORT = 8770


def read_cfg():
    with open(CFG, encoding="utf-8") as f:
        text = f.read()
    return json.loads(re.sub(r"^\s*window\.CFG\s*=\s*", "", text).rstrip().rstrip(";"))


def write_cfg(data):
    tmp = CFG + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        f.write("window.CFG=" + json.dumps(data, ensure_ascii=False, indent=1) + ";\n")
    os.replace(tmp, CFG)


class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def _json(self, code, obj):
        body = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path.split("?")[0] == "/api/config":
            return self._json(200, read_cfg())
        if self.path in ("/", ""):
            self.send_response(302)
            self.send_header("Location", "/panel/")
            return self.end_headers()
        return super().do_GET()

    def do_POST(self):
        if self.path != "/api/config":
            return self._json(404, {"error": "no existe"})
        try:
            n = int(self.headers.get("Content-Length", 0))
            data = json.loads(self.rfile.read(n).decode("utf-8"))
            if not isinstance(data, dict):
                raise ValueError("formato no válido")
            write_cfg(data)
            return self._json(200, {"ok": True})
        except Exception as e:
            return self._json(400, {"error": str(e)})

    def log_message(self, fmt, *args):
        pass


if __name__ == "__main__":
    srv = ThreadingHTTPServer(("127.0.0.1", PORT), partial(Handler, directory=ROOT))
    url = f"http://127.0.0.1:{PORT}/panel/"
    print(f"Panel de overlays en {url}  (cierra esta ventana para apagarlo)")
    if not os.environ.get("PANEL_NO_BROWSER"):
        webbrowser.open(url)
    srv.serve_forever()
