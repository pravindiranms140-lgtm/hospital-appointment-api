import prisma from './lib/prisma';

export async function createDoctor(data: { firstName: string; lastName: string; specialty: string }) {
  return prisma.doctor.create({ data });
}

export async function getDoctor(id: number) {
  return prisma.doctor.findUnique({ where: { id } });
}

export async function listDoctorsBySpecialty(specialty: string) {
  return prisma.doctor.findMany({ where: { specialty } });
}

export async function deleteDoctor(id: number) {
  return prisma.doctor.delete({ where: { id } });
}
