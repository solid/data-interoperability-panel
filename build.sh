echo "Build: running bikeshed"
for bsdoc in proposals/*/index.bs
  do
    bikeshed spec $bsdoc
done

echo "Build: running mermaid for sequence diagrams"
for diagram in proposals/*/diagrams/*.seq.mmd
  do
    npx mmdc -i $diagram
done

echo "Build: running mermaid for flowchart diagrams"
for diagram in proposals/*/diagrams/*.flow.mmd
  do
    npx mmdc -i $diagram -o $diagram.png
done

echo "Build: done!"
