import prisma from './lib/prisma';

export async function bookAppointment(patientId: number, doctorId: number, appointmentDate: Date) {
  return prisma.appointment.create({
    data: {
      appointmentDate,
      status: 'SCHEDULED',
      Patient: { connect: { id: patientId } },
      Doctor: { connect: { id: doctorId } }
    },
    include: {
      Patient: true,
      Doctor: true
    }
  });
}

export async function getAppointmentFull(id: number) {
  return prisma.appointment.findUnique({
    where: { id },
    include: {
      Patient: true,
      Doctor: true
    }
  });
}

export async function getDoctorUpcomingAppointments(doctorId: number) {
  return prisma.appointment.findMany({
    where: {
      doctorId,
      status: 'SCHEDULED',
      appointmentDate: { gte: new Date() }
    },
    include: { Patient: true }
  });
}

export async function setAppointmentStatus(id: number, status: string) {
  return prisma.appointment.update({
    where: { id },
    data: { status }
  });
}

export async function cancelAllPatientAppointments(patientId: number) {
  return prisma.appointment.updateMany({
    where: { patientId, status: 'SCHEDULED' },
    data: { status: 'CANCELLED' }
  });
}

export async function deleteAppointment(id: number) {
  return prisma.appointment.delete({ where: { id } });
}
