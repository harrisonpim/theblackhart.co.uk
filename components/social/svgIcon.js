export default function SvgIcon({ title, href, size }) {
  return (
    <div>
      <a href={href} title={title}>
        <img
          width={size}
          height={size}
          src={`/icons/social/${title}.svg`.toLowerCase()}
          alt={title}
        ></img>
      </a>
    </div>
  );
}
