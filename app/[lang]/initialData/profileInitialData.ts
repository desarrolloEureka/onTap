const dataPrincipalProfileEmail = {
  label: '',
  text: '',
  checked: false,
  principal: true,
  social: true
};
const dataPrincipalProfilePhone = {
  label: '',
  text: '',
  checked: false,
  principal: true,
  social: true
};
const dataPrincipalEducations = {
  label: '',
  title: '',
  institution: '',
  year: '',
  checked: false,
  principal: true,
  social: false
};
const dataPrincipalCareer = {
  label: '',
  company: '',
  position: '',
  data_init: '',
  data_end: '',
  checked: false,
  principal: true,
  social: false,
};
export const profile = {
  name: { label: '', text: '', checked: false, social: true },
  last_name: { label: '', text: '', checked: false, social: true },
  profession: { label: '', text: '', checked: false, social: true },
  occupation: { label: '', text: '', checked: false, social: true },
  address: { label: '', text: '', checked: false, social: true },
  company: { label: '', text: '', checked: false, social: false },
  position: { label: '', text: '', checked: false, social: false },
  professional_profile: { label: '', text: '', checked: false, social: false },
  phones: [dataPrincipalProfilePhone],
  emails: [dataPrincipalProfileEmail],
  education: [dataPrincipalEducations],
  professional_career: [dataPrincipalCareer],
  other_competencies: { label: '', text: '', checked: false, social: false },
  skills: { label: '', text: '', checked: false, social: false },
  languages: { label: '', text: '', checked: false, social: false },
  achievements_recognitions: { label: '', text: '', checked: false, social: false },
};
