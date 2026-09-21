const major = Number(process.versions.node.split(".")[0]);

if (major !== 18) {
  console.error(
    `Next 12 neste projeto precisa de Node 18 (agora ${process.version}).\nRode: nvm use`
  );
  process.exit(1);
}
