import Image from "next/image";

export default function SvgIcon({ title, href, size }) {
  return (
    <div>
      <a href={href} title={title}>
        <Image
          width={size}
          height={size}
          src={`/icons/social/${title}.svg`.toLowerCase()}
          alt={title}
        ></Image>
      </a>
    </div>
  );
}
