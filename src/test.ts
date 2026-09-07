import { createPatient, getPatient, searchPatients, updatePatientPhone, deletePatient } from './patients';
import { createDoctor, getDoctor, listDoctorsBySpecialty, deleteDoctor } from './doctors';
import { bookAppointment, getAppointmentFull, getDoctorUpcomingAppointments, setAppointmentStatus, cancelAllPatientAppointments, deleteAppointment } from './appointments';
import prisma from './lib/prisma';

async function runTests() {
  console.log('--- Starting Tests ---');

  // Doctor CRUD
  const doc = await createDoctor({ firstName: 'Gregory', lastName: 'House', specialty: 'Diagnostics' });
  console.log('Created Doctor:', doc);

  const fetchedDoc = await getDoctor(doc.id);
  console.log('Fetched Doctor:', fetchedDoc);

  const specialists = await listDoctorsBySpecialty('Diagnostics');
  console.log('List Doctors by Specialty:', specialists);

  // Patient CRUD
  const pat = await createPatient({ firstName: 'James', lastName: 'Moriarty', phone: '111-222-3333', dateOfBirth: new Date('1976-04-04') });
  console.log('Created Patient:', pat);

  const fetchedPat = await getPatient(pat.id);
  console.log('Fetched Patient:', fetchedPat);

  const searchedPats = await searchPatients('James');
  console.log('Search Patients:', searchedPats);

  const updatedPat = await updatePatientPhone(pat.id, '999-888-7777');
  console.log('Updated Patient Phone:', updatedPat);

  // Appointment CRUD
  const appt = await bookAppointment(pat.id, doc.id, new Date(Date.now() + 86400000)); // tomorrow
  console.log('Booked Appointment:', appt);

  const fullAppt = await getAppointmentFull(appt.id);
  console.log('Get Full Appointment:', fullAppt);

  const upcomingAppts = await getDoctorUpcomingAppointments(doc.id);
  console.log('Doctor Upcoming Appointments:', upcomingAppts);

  const updatedAppt = await setAppointmentStatus(appt.id, 'CONFIRMED');
  console.log('Set Appointment Status:', updatedAppt);

  const cancelAppts = await cancelAllPatientAppointments(pat.id);
  console.log('Cancel All Patient Appointments:', cancelAppts);

  // Deletions
  const deletedAppt = await deleteAppointment(appt.id);
  console.log('Deleted Appointment:', deletedAppt);

  const deletedPat = await deletePatient(pat.id);
  console.log('Deleted Patient:', deletedPat);

  const deletedDoc = await deleteDoctor(doc.id);
  console.log('Deleted Doctor:', deletedDoc);

  console.log('--- All Tests Passed Successfully ---');
}

runTests()
  .catch((e) => {
    console.error('Test Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
