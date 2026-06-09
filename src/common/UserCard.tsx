import { FaLinkedin } from "react-icons/fa";

type UserCardProps = {
  picture?: string;
  title: string;
  subtitle: string;
  description?: string;
  cardLink?: string;
  featured?: boolean;
};

const UserCard = ({
  picture,
  title,
  subtitle,
  description,
  cardLink,
  featured = false,
}: UserCardProps) => {
  if (featured) {
    return (
      <a
        href={cardLink}
        target="_blank"
        rel="noopener noreferrer"
        className="
    group
    flex
    flex-col
    items-center
    text-center

    sm:flex-row
    sm:items-center
    sm:text-left

    gap-6
    rounded-2xl
    border
    border-violet-200
    bg-gradient-to-r
    from-white
    to-violet-50
    p-6
    sm:p-8

    shadow-sm
    transition-all
    duration-300
    hover:shadow-md
  "
      >
        <img
          src={picture}
          alt={title}
          className="
            h-24
            w-24
            rounded-full
            object-cover
            ring-4
            ring-white
          "
        />

        <div className="flex-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-violet-600">
            Team Owner
          </span>

          <h3 className="mt-2 text-3xl font-bold text-slate-900">{title}</h3>

          <p className="mt-1 text-base text-slate-600">{subtitle}</p>

          {description && (
            <p className="mt-4 text-sm leading-6 text-slate-500">
              {description}
            </p>
          )}
        </div>

        <FaLinkedin
          size={28}
          className="
            text-slate-300
            transition-colors
            group-hover:text-blue-600
          "
        />
      </a>
    );
  }

  return (
    <a
      href={cardLink}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group
        flex
        items-center
        gap-4
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-violet-200
        hover:shadow-lg
      "
    >
      <img
        src={picture}
        alt={title}
        className="
          h-16
          w-16
          rounded-full
          object-cover
        "
      />

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-lg font-semibold text-slate-900">
          {title}
        </h3>

        <p className="text-sm text-slate-600">{subtitle}</p>

        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}
      </div>

      <FaLinkedin
        size={20}
        className="
          shrink-0
          text-slate-300
          transition-colors
          group-hover:text-blue-600
        "
      />
    </a>
  );
};

export default UserCard;
