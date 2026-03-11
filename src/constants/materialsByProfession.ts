export interface MaterialPreset {
  icon: string;
  nome: string;
  qty: number;
  unit: string;
  precoUnit: number;
}

export const materialsByProfession: Record<string, MaterialPreset[]> = {
  pedreiro: [
    { icon: '🔲', nome: 'Porcelanato 60x60', qty: 90, unit: 'peças', precoUnit: 45 },
    { icon: '🪨', nome: 'Argamassa AC-III', qty: 5, unit: 'sacos', precoUnit: 28 },
    { icon: '🟫', nome: 'Rejunte', qty: 3, unit: 'kg', precoUnit: 12 },
    { icon: '🧱', nome: 'Tijolo baiano', qty: 200, unit: 'unid.', precoUnit: 0.8 },
  ],
  eletricista: [
    { icon: '🔌', nome: 'Fio 2,5mm²', qty: 50, unit: 'metros', precoUnit: 4.5 },
    { icon: '⚡', nome: 'Disjuntor 20A', qty: 4, unit: 'unid.', precoUnit: 18 },
    { icon: '🔧', nome: 'Tomada 2P+T', qty: 10, unit: 'unid.', precoUnit: 12 },
    { icon: '💡', nome: 'Interruptor simples', qty: 6, unit: 'unid.', precoUnit: 8 },
    { icon: '📦', nome: 'Eletroduto 3/4"', qty: 20, unit: 'metros', precoUnit: 3.2 },
  ],
  encanador: [
    { icon: '🚿', nome: 'Tubo PVC 25mm', qty: 30, unit: 'metros', precoUnit: 6 },
    { icon: '🔩', nome: 'Joelho 90° 25mm', qty: 12, unit: 'unid.', precoUnit: 2.5 },
    { icon: '🪛', nome: 'Registro de gaveta', qty: 3, unit: 'unid.', precoUnit: 35 },
    { icon: '💧', nome: 'Vedante (fita veda)', qty: 5, unit: 'rolos', precoUnit: 4 },
    { icon: '🔧', nome: 'Luva de correr 25mm', qty: 8, unit: 'unid.', precoUnit: 3 },
  ],
};