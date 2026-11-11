#!/usr/bin/env bash
# Script mudah untuk menjalankan server lokal Greenwood Barbers
# 100% aman dan terisolasi dari website produksi (greenwood.id)

cd "$(dirname "$0")"
python3 scripts/dev-server.py
