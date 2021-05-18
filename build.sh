for bsdoc in proposals/**/index.bs; do bikeshed spec $bsdoc; done
for diagram in proposals/**/*.mmd; do npx mmdc -i $diagram; done
