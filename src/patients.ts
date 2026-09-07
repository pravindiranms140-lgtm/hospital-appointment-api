import prisma from './lib/prisma';

export async function createPatient(data: { firstName: string; lastName: string; phone: string; dateOfBirth: Date }) {
  return prisma.patient.create({ data });
}

export async function getPatient(id: number) {
  return prisma.patient.findUnique({ where: { id } });
}

export async function searchPatients(name: string) {
  return prisma.patient.findMany({
    where: {
      OR: [
        { firstName: { contains: name } },
        { lastName: { contains: name } }
      ]
    }
  });
}

export async function updatePatientPhone(id: number, phone: string) {
  return prisma.patient.update({
    where: { id },
    data: { phone }
  });
}

export async function deletePatient(id: number) {
  return prisma.patient.delete({ where: { id } });
}
