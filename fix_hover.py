import os
import glob
import re

html_files = glob.glob('*.html') + glob.glob('assets/js/*.js')

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    def replacer(match):
        class_str = match.group(0)
        if 'hover:from-violet-600' not in class_str:
            return class_str.replace('to-indigo-800', 'to-indigo-800 hover:from-violet-600 hover:to-indigo-700')
        return class_str

    # Target class attributes containing the blue button gradient
    new_content = re.sub(r'class="[^"]*from-violet-700 to-indigo-800[^"]*"', replacer, content)
    new_content = re.sub(r"class='[^']*from-violet-700 to-indigo-800[^']*'", replacer, new_content)
    
    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated {file}')
