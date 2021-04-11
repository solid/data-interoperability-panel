for bsdoc in proposals/**/*.bs; do bikeshed spec $bsdoc; done
for diagram in proposals/**/*.mmd; do npx mmdc -i $diagram; done
