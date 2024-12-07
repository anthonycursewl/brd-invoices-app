interface TypeProfile {
    info: { 
        type: string,
        desc: string,
        title: string
    },
    icon: React.ReactNode
}

export default function ProfileSection({ info, icon }: TypeProfile) {
  return (
    <div className="profile-utils-info-account">
      <div className="profile-u-title">
        {icon}
        <h2>{info.title}</h2>
      </div>

      <div className="profile-utils-divider">
        <div className="profile-personal-information">
          <div className="profile-p-title">
            <p>{info.type}</p>
          </div>

          <div className="profile-p-content">
            <p>{info.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
