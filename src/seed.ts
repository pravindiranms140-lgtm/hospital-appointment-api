import prisma from './lib/prisma';

async function main() {
  console.log('Starting seed...');

  const doctor1 = await prisma.doctor.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      specialty: 'Cardiology'
    }
  });

  const patient1 = await prisma.patient.create({
    data: {
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '1234567890',
      dateOfBirth: new Date('1990-01-01')
    }
  });

  const appointment1 = await prisma.appointment.create({
    data: {
      Patient: { connect: { id: patient1.id } },
      Doctor: { connect: { id: doctor1.id } },
      appointmentDate: new Date('2026-10-01T10:00:00Z'),
      status: 'SCHEDULED'
    }
  });

  console.log('Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
