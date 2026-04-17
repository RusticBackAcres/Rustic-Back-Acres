import os

nav = open('/home/claude/rba2/_nav.html').read()
footer = open('/home/claude/rba2/_footer.html').read()

def page(title, head_extra, body):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title} — Rustic Back Acres</title>
  <meta name="description" content="Rustic Back Acres — ADGA Nigerian Dwarf goats in Brighton, Tennessee." />
  <link rel="stylesheet" href="css/style.css" />{head_extra}
</head>
<body>
{nav}
{body}
{footer}
<script src="js/main.js"></script>
</body>
</html>"""

print("Build script ready")
