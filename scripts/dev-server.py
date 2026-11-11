#!/usr/bin/env python3
"""
Greenwood Barbers — Local Development Server
Runs a fully isolated local server supporting clean URLs and instant live preview.
Guarantees zero modifications or impact to the live production site (https://greenwood.id).
"""

import http.server
import socketserver
import os
import sys
import webbrowser

PORT = 3000
DIRECTORY = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

class GreenwoodDevHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def translate_path(self, path):
        # Default translation to absolute filesystem path
        clean_path = super().translate_path(path)
        # If the direct path does not exist, but adding .html exists, serve that .html file
        if not os.path.exists(clean_path):
            html_candidate = clean_path + '.html'
            if os.path.exists(html_candidate):
                return html_candidate
        return clean_path

    def end_headers(self):
        # Disable browser cache during local development so edits appear immediately
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

    def log_message(self, format, *args):
        # Clean request logging
        sys.stderr.write(f"  [DEV LOG] {self.address_string()} - {format % args}\n")

def run_server():
    os.chdir(DIRECTORY)
    port = PORT
    for attempt in range(10):
        try:
            with socketserver.TCPServer(("", port), GreenwoodDevHandler) as httpd:
                local_url = f"http://localhost:{port}"
                print("\n" + "="*65)
                print("🌿 GREENWOOD BARBERS — LOCAL DEVELOPMENT ENVIRONMENT")
                print("="*65)
                print(f"  Localhost URL : {local_url}")
                print(f"  Booking Page  : {local_url}/booking.html (or {local_url}/booking)")
                print(f"  Root Dir      : {DIRECTORY}")
                print(f"  Production    : https://greenwood.id (100% AMAN & TIDAK TERSENTUH)")
                print("="*65)
                print("  💡 Tips:")
                print("  - Edit file apa pun di VS Code / editor Anda.")
                print("  - Refresh browser Anda untuk melihat perubahan seketika.")
                print("  - Tekan CTRL + C di terminal ini untuk mematikan server.")
                print("="*65 + "\n")
                
                # Automatically open in default browser
                try:
                    webbrowser.open(local_url)
                except Exception:
                    pass

                httpd.serve_forever()
                break
        except OSError as e:
            if e.errno == 48: # Address already in use
                port += 1
                continue
            raise

if __name__ == '__main__':
    try:
        run_server()
    except KeyboardInterrupt:
        print("\n🛑 Localhost server dihentikan. Semua aman!")
        sys.exit(0)
