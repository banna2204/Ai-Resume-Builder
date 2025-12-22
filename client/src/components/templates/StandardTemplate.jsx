import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const AcademicPETemplate = ({ data,accentColor }) => {
   const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };
  return (
    <div className="max-w-4xl mx-auto p-10 bg-white text-black text-sm leading-relaxed font-serif">
      
      {/* HEADER */}
      <div className="mb-4 " style={{ borderColor: accentColor }}>
        <div className="flex items-center justify-center">

        <h1 className="text-xl font-bold uppercase" style={{ color: accentColor }}>
          {data.personal_info?.full_name || "Your Name"}
        </h1>
        </div>

        
         <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-1">
                            <Mail className="size-4" />
                            <span>{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-1">
                            <Phone className="size-4" />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-1">
                            <MapPin className="size-4" />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <div className="flex items-center gap-1">
                            <Linkedin className="size-4" />
                            <span className="break-all">{data.personal_info.linkedin}</span>
                        </div>
                    )}
                    {data.personal_info?.website && (
                        <div className="flex items-center gap-1">
                            <Globe className="size-4" />
                            <span className="break-all">{data.personal_info.website}</span>
                        </div>
                    )}
                </div>
      </div>

      {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-5">
                    <h2 className="font-bold border-b border-black mb-2" style={{ color: accentColor }}>
                        PROFESSIONAL SUMMARY
                    </h2>
                    <p className="text-gray-700 leading-relaxed">{data.professional_summary}</p>
                </section>
            )}

      {/* EDUCATION */}
      {data.education?.length > 0 && (
        <section className="mb-5">
          <h2 className="font-bold border-b border-black mb-2" style={{ color: accentColor }}>
            Education
          </h2>

          <div className="space-y-2">
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <p className="font-semibold">{edu.institution}</p>
                  <p className="italic">
                    {edu.degree} {edu.field && `(${edu.field})`}
                  </p>
                </div>
                <div className="text-right whitespace-nowrap">
                  {edu.graduation_date || "—"}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EXPERIENCE */}
      {data.experience?.length > 0 && (
        <section className="mb-5">
          <h2 className="font-bold border-b border-black mb-2" style={{ color: accentColor }}>
            Experience
          </h2>

          <ul className="list-disc list-inside space-y-1">

            {data.experience.map((exp, index) => (
                            <div key={index} className=" pl-1" style={{ borderColor: accentColor }}>
                                <div className="flex justify-between items-start mb-1">
                                    <div className="flex gap-1">
                                        <h3 className="font-semibold text-gray-900">{exp.position}</h3>at
                                        <p className="text-gray-700 font-medium">{exp.company}</p>
                                    </div>
                                    <div className="text-right text-sm text-gray-600">
                                        <p>{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}</p>
                                    </div>
                                </div>
                                {exp.description && (
                                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {exp.description}
                                    </div>
                                )}
                            </div>
                        ))}
          </ul>
          
        </section>
      )}

     {/* SKILLS / SPECIALIZATION */}
{data.skills?.length > 0 && (
  <section className="mb-5">
    <h2
      className="font-bold border-b mb-2 uppercase"
      style={{ borderColor: accentColor, color: accentColor }}
    >
      Skills / Specialization
    </h2>

    <div className="flex flex-wrap gap-x-6 gap-y-1">
      {data.skills.map((skill, index) => (
        <span key={index} className="text-black">
          • {skill}
        </span>
      ))}
    </div>
  </section>
)}


      {/* PROJECTS */}
{data.project && data.project.length > 0 && (
  <section className="mb-5">
    <h2
      className="font-bold border-b mb-2 uppercase"
      style={{ borderColor: accentColor, color: accentColor }}
    >
      Projects
    </h2>

    <ul className="list-disc list-inside space-y-1">
      {data.project.map((project, index) => (
        <li key={index} className="text-black">
          <span className="font-semibold">
            {project.name}
          </span>
          {project.description && (
            <span> – {project.description}</span>
          )}
        </li>
      ))}
    </ul>
  </section>
)}

    </div>
  );
};

export default AcademicPETemplate;
