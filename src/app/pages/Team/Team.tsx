import UserCard from "../../../common/UserCard";

import TanmayLinkedin from "../../../assets/TanmayLinkedin.jpeg";
import RudranshLinkedin from "../../../assets/RudranshLinkedin.png";
import VaibhavLinkedin from "../../../assets/VaibhavLinkedin.jpeg";
import UditLinkedin from "../../../assets/UditLinkedin.jpeg";

const friends = [
  {
    linkedin: "https://www.linkedin.com/in/rudranshnagar/",
    name: "Rudransh Nagar",
    designation: "Full Stack Developer",
    company: "Afficiency, New York",
    picture: RudranshLinkedin,
  },
  {
    linkedin: "https://www.linkedin.com/in/vaibhavbhawalkar/",
    name: "Vaibhav Bhawalkar",
    designation: "Senior UI Engineer",
    company: "EclecticIQ",
    picture: VaibhavLinkedin,
  },
  {
    linkedin: "https://www.linkedin.com/in/aedit/",
    name: "Udit Sen",
    designation: "Senior UI Engineer",
    company: "EclecticIQ",
    picture: UditLinkedin,
  },
];

const TanmayDescription = `Software Engineer with 5+ years across startup (Peoplebox-YC S22) and enterprise (Oracle), focused on
frontend architecture, product ownership, and reusable UI systems in React and TypeScript.`;

const Team = () => {
  return (
    <div className="flex flex-col">
      <section className="mb-12">
        <UserCard
          featured
          picture={TanmayLinkedin}
          title="Tanmay Verma"
          subtitle="Ex Software Developer 3 · Oracle"
          description={TanmayDescription}
          cardLink="https://www.linkedin.com/in/tanmayv/"
        />
      </section>

      <section>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">Team Members</h2>

          <p className="text-sm text-slate-500">
            Shout out to awesome developers who inspire me.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {friends.map((friend) => (
            <UserCard
              key={friend.name}
              picture={friend.picture}
              title={friend.name}
              subtitle={friend.designation}
              description={friend.company}
              cardLink={friend.linkedin}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Team;
