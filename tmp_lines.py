from pathlib import Path
paths = [
    Path('src/context/siteInfo.tsx'),
    Path('src/components/Hero.tsx'),
    Path('src/components/Navigation.tsx'),
    Path('src/components/Contact.tsx'),
    Path('src/components/About.tsx'),
    Path('src/components/Footer.tsx'),
    Path('index.html')
]
for path in paths:
    print(f'--- {path} ---')
    for idx, line in enumerate(path.read_text().splitlines(), 1):
        print(f'{idx}: {line}')
    print()
