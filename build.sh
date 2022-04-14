echo "Build: running bikeshed"
bikeshed spec proposals/specification/index.bs
bikeshed spec  proposals/primer/application.bs
bikeshed spec  proposals/primer/authorization-agent.bs

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
