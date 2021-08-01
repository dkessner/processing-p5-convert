#!/bin/bash

if [ $# -ne 1 ]
then
    echo "Usage: test_conversion.sh filename.pde"
    exit 1
fi

filename=$1
filename_js=${filename/pde/js}
filename_reconstruct=${filename/pde/reconstruct}

ppconvert $filename > $filename_js

ppconvert $filename --reconstruct > $filename_reconstruct

mkdir temp
cp $filename_reconstruct temp/temp.pde
processing-java --sketch=temp --run

