#!/usr/bin/ksh


find . -name "*.js" -exec echo "<script src=\"/ContextPath/services"{}"\"></script>"  \; | grep -vi tests | sed "s/s\./s/"

