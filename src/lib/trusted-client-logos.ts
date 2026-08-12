const TRUSTED_CLIENTS_DIR = "/Trusted%20Across%20Industries";

function fileToLabel(filename: string): string {
  return filename
    .replace(/\.png$/i, "")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const trustedClientFiles = [
  "Aashish_Group.png",
  "AHC.png",
  "Allen_Career_Institute.png",
  "Anytime_Fitness.png",
  "Braveheart_Gym.png",
  "Brajeshwar_Builders.png",
  "Canoso_Childrens_Hospital.png",
  "Care_Close_To_Home.png",
  "Chai_Sutta_Bar.png",
  "Chetram_Hotels.png",
  "DMCC_Hospital.png",
  "DNA_Power_Fitness_Center.png",
  "Dunecrest_Pre_School.png",
  "Galley_Bath_Kitchen.png",
  "Get_ePay.png",
  "Glitter_Electrical.png",
  "GoSpectacular.png",
  "GPSH.png",
  "Hamlai_Industries.png",
  "Imperial_Group.png",
  "JECRC_University.png",
  "JR_Logo.png",
  "Kanthal_Sonography_Lab.png",
  "Khandelwal_Classes.png",
  "Le_Grande.png",
  "Mahakayaa_Gym.png",
  "Magenta_Hotels.png",
  "Nortek.png",
  "Orbital_International_School.png",
  "Rajasthan_Sonography_Centre.png",
  "Rajasthan_State_Cooperative_Bank.png",
  "ReneSola.png",
  "Rolta.png",
  "Smart_Hotel.png",
  "Star_Group.png",
  "Stryder.png",
  "Suresh_Gyan_Vihar_University.png",
  "The_Kook.png",
  "The_Yellow_House.png",
  "Tirupati_Housing.png",
  "UM_Cancer_Hospital.png",
  "Unnati_Group.png",
  "Yamaha.png",
] as const;

export type TrustedClientLogo = {
  src: string;
  name: string;
};

export const trustedClientLogos: TrustedClientLogo[] = trustedClientFiles.map(
  (file) => ({
    src: `${TRUSTED_CLIENTS_DIR}/${file}`,
    name: fileToLabel(file),
  }),
);
