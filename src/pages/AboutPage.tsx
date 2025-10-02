import React from "react";
import { Linkedin, Mail } from "lucide-react";

interface Profile {
  name: string;
  role: string;
  photoUrl: string;
  linkedinUrl: string;
  email: string;
}

const developers: Profile[] = [
  {
    name: "Alice Johnson",
    role: "Frontend Engineer",
    photoUrl: "/assets/alice.jpg",
    linkedinUrl: "https://linkedin.com/in/alice-johnson",
    email: "alice@example.com",
  },
  {
    name: "Bob Lee",
    role: "Backend Engineer",
    photoUrl: "/assets/bob.jpg",
    linkedinUrl: "https://linkedin.com/in/bob-lee",
    email: "bob@example.com",
  },
  {
    name: "Carol Nguyen",
    role: "UI/UX Designer",
    photoUrl: "/assets/carol.jpg",
    linkedinUrl: "https://linkedin.com/in/carol-nguyen",
    email: "carol@example.com",
  },
  {
    name: "David Smith",
    role: "Data Scientist",
    photoUrl: "/assets/david.jpg",
    linkedinUrl: "https://linkedin.com/in/david-smith",
    email: "david@example.com",
  },
];

const supervisor: Profile = {
  name: "Dr. Emma Thompson",
  role: "Project Supervisor",
  photoUrl: "/assets/emma.jpg",
  linkedinUrl: "https://linkedin.com/in/emma-thompson",
  email: "emma@example.com",
};

const ProfileCard: React.FC<{ profile: Profile; highlighted?: boolean }> = ({
  profile,
  highlighted = false,
}) => (
  <div
    className={`
      flex flex-col items-center bg-gray-800 p-6 rounded-2xl shadow-xl
      ${
        highlighted
          ? "border-4 border-gradient-to-tr from-pink-500 to-indigo-500"
          : ""
      }
    `}
  >
    <img
      src={profile.photoUrl}
      alt={profile.name}
      className="w-32 h-32 rounded-full object-cover mb-4 ring-2 ring-gray-600"
    />
    <h3 className="text-2xl font-semibold">{profile.name}</h3>
    <p className="text-gray-400 mb-4">{profile.role}</p>
    <div className="flex space-x-4">
      <a
        href={profile.linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-blue-400 transition"
      >
        <Linkedin size={24} />
      </a>
      <a
        href={`mailto:${profile.email}`}
        className="hover:text-green-400 transition"
      >
        <Mail size={24} />
      </a>
    </div>
  </div>
);

const AboutPage: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white p-8">
    <header className="text-center mb-12">
      <h1 className="text-5xl font-extrabold">Meet the Team</h1>
      <p className="text-gray-400 mt-2">The minds behind MART</p>
    </header>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
      {developers.map((dev) => (
        <ProfileCard key={dev.email} profile={dev} />
      ))}
    </div>

    <div className="flex justify-center">
      <ProfileCard profile={supervisor} highlighted />
    </div>
  </div>
);

export default AboutPage;
