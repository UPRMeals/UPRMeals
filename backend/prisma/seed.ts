import { ItemType, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const menu = await prisma.menu.create({
    data: {
      name: 'Menu Marzo 21, 2024',
      date: new Date('2024-03-21'),
    },
  });

  await prisma.combo.createMany({
    data: [
      {
        name: 'Puertorriqueño',
        description: 'Incluye agua o refresco de maquina.',
        price: 5.99,
        menuId: menu.id,
      },
      {
        name: 'Estadounidense',
        description: 'Incluye agua o refresco de maquina.',
        price: 4.99,
        menuId: menu.id,
      },
      {
        name: 'Mediterraneo',
        description: 'Incluye agua o refresco de maquina.',
        price: 6.49,
        menuId: menu.id,
      },
    ],
  });

  await prisma.item.createMany({
    data: [
      {
        name: 'Arroz Blanco',
        price: 1.99,
        type: ItemType.SIDE,
        menuId: menu.id,
      },
      {
        name: 'Habichuelas Rosadas',
        price: 1.49,
        type: ItemType.SIDE,
        menuId: menu.id,
      },
      {
        name: 'Arroz Amarrillo con Gandules',
        price: 2.49,
        type: ItemType.SIDE,
        menuId: menu.id,
      },
      {
        name: 'Lasagna',
        price: 2.99,
        type: ItemType.SIDE,
        menuId: menu.id,
      },
      {
        name: 'Pasta Salsa Blanca',
        price: 2.99,
        type: ItemType.SIDE,
        menuId: menu.id,
      },
      {
        name: 'Pasta Salsa Roja',
        price: 2.99,
        type: ItemType.SIDE,
        menuId: menu.id,
      },
      {
        name: 'Amarillitos',
        price: 1.49,
        type: ItemType.SIDE,
        menuId: menu.id,
      },
      {
        name: 'Fritas',
        price: 0.99,
        type: ItemType.SIDE,
        menuId: menu.id,
      },
      {
        name: 'Batatitas Fritas',
        price: 0.99,
        type: ItemType.SIDE,
        menuId: menu.id,
      },
      {
        name: 'Pollo',
        price: 3.99,
        type: ItemType.PROTEIN,
        menuId: menu.id,
      },
      {
        name: 'Res',
        price: 4.99,
        type: ItemType.PROTEIN,
        menuId: menu.id,
      },
      {
        name: 'Cerdo',
        price: 4.49,
        type: ItemType.PROTEIN,
        menuId: menu.id,
      },
      {
        name: 'Pescado',
        price: 5.49,
        type: ItemType.PROTEIN,
        menuId: menu.id,
      },
      {
        name: 'Pulpo',
        price: 5.49,
        type: ItemType.PROTEIN,
        menuId: menu.id,
      },
    ],
  });

  const comboPR = await prisma.combo.findFirst({
    where: { name: 'Puertorriqueño', menuId: menu.id },
  });

  const comboEU = await prisma.combo.findFirst({
    where: { name: 'Estadounidense', menuId: menu.id },
  });

  const comboMED = await prisma.combo.findFirst({
    where: { name: 'Mediterraneo', menuId: menu.id },
  });

  const sides = await prisma.item.findMany({
    where: { menuId: menu.id, type: ItemType.SIDE },
  });

  const proteins = await prisma.item.findMany({
    where: { menuId: menu.id, type: ItemType.PROTEIN },
  });

  /*
    combo pr: 
        acompañantes: arroz amarillo con gandules, arroz blanco, habichuelas rosadas, amarillitos, batatitas fritas
        proteina: res, cerdo
    */

  await prisma.comboItem.createMany({
    data: [
      {
        comboId: comboPR.id,
        itemId: sides.find(
          (side) => side.name === 'Arroz Amarrillo con Gandules',
        ).id,
      },
      {
        comboId: comboPR.id,
        itemId: sides.find((side) => side.name === 'Arroz Blanco').id,
      },
      {
        comboId: comboPR.id,
        itemId: sides.find((side) => side.name === 'Habichuelas Rosadas').id,
      },
      {
        comboId: comboPR.id,
        itemId: sides.find((side) => side.name === 'Amarillitos').id,
      },
      {
        comboId: comboPR.id,
        itemId: sides.find((side) => side.name === 'Batatitas Fritas').id,
      },
      {
        comboId: comboPR.id,
        itemId: proteins.find((protein) => protein.name === 'Res').id,
      },
      {
        comboId: comboPR.id,
        itemId: proteins.find((protein) => protein.name === 'Cerdo').id,
      },
    ],
  });

  /*
    combo us: 
        acompañantes:  arroz blanco, fritas, batatitas fritas
        proteina: pollo
    */

  await prisma.comboItem.createMany({
    data: [
      {
        comboId: comboEU.id,
        itemId: sides.find((side) => side.name === 'Arroz Blanco').id,
      },
      {
        comboId: comboEU.id,
        itemId: sides.find((side) => side.name === 'Fritas').id,
      },
      {
        comboId: comboEU.id,
        itemId: sides.find((side) => side.name === 'Batatitas Fritas').id,
      },
      {
        comboId: comboEU.id,
        itemId: proteins.find((protein) => protein.name === 'Pollo').id,
      },
    ],
  });

  /*
    combo mediterraneo: 
        acompañantes:  lasagna, pasta salsa blanca, pasta salsa roja, fritas, batatitas fritas
        proteina: pollo, pulpo, res, pescado
    */

  await prisma.comboItem.createMany({
    data: [
      {
        comboId: comboMED.id,
        itemId: sides.find((side) => side.name === 'Lasagna').id,
      },
      {
        comboId: comboMED.id,
        itemId: sides.find((side) => side.name === 'Pasta Salsa Blanca').id,
      },
      {
        comboId: comboMED.id,
        itemId: sides.find((side) => side.name === 'Pasta Salsa Roja').id,
      },
      {
        comboId: comboMED.id,
        itemId: sides.find((side) => side.name === 'Fritas').id,
      },
      {
        comboId: comboMED.id,
        itemId: sides.find((side) => side.name === 'Batatitas Fritas').id,
      },
      {
        comboId: comboMED.id,
        itemId: proteins.find((protein) => protein.name === 'Pollo').id,
      },
      {
        comboId: comboMED.id,
        itemId: proteins.find((protein) => protein.name === 'Pulpo').id,
      },
      {
        comboId: comboMED.id,
        itemId: proteins.find((protein) => protein.name === 'Res').id,
      },
      {
        comboId: comboMED.id,
        itemId: proteins.find((protein) => protein.name === 'Pescado').id,
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
