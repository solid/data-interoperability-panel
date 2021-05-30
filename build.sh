echo "Build: running bikeshed"
for bsdoc in proposals/*/index.bs
  do
    bikeshed spec $bsdoc
done

echo "Build: running mermaid"
for diagram in proposals/*/diagrams/*.mmd
  do
    npx mmdc -i $diagram
done

echo "Build: done!"
