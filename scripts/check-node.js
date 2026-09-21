const major = Number(process.versions.node.split(".")[0]);
const supported = new Set([20, 22, 24]);

if (!supported.has(major)) {
  console.error(
    `Este projeto precisa de Node 20, 22 ou 24 (agora ${process.version}).\nRode: nvm use`
  );
  process.exit(1);
}
