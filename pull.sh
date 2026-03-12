#!/usr/bin/env bash
git clone --branch claude/enchart-frontend-skeleton-6xANQ --single-branch https://github.com/CyberTechArmor/EHR.git . 2>/dev/null || git -C "$(dirname "$0")" pull origin claude/enchart-frontend-skeleton-6xANQ
