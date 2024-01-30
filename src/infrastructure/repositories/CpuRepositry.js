import { PrismaClient } from '@prisma/client';

class CpuRepository {
  constructor() {
    this.prisma = new PrismaClient();
  }

  // CPUを作成する
  async createCpu(cpuData) {
    return this.prisma.cpu.create({
      data: cpuData
    });
  }

  // 特定のIDを持つCPUを取得する
  async findCpuById(cpuId) {
    return this.prisma.cpu.findUnique({
      where: { id: cpuId }
    });
  }

  // CPUのデータを更新する
  async updateCpu(cpuId, newCpuData) {
    return this.prisma.cpu.update({
      where: { id: cpuId },
      data: newCpuData
    });
  }

  // 特定のCPUを削除する
  async deleteCpu(cpuId) {
    return this.prisma.cpu.delete({
      where: { id: cpuId }
    });
  }
}

export default CpuRepository;