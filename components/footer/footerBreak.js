export default function FooterBreak(props) {
  return (
    <div {...props}>
      <div className=" flex items-center">
        <div className="flex-grow border-t border-white" />
        <img src="/icons/tbh_white.png" className="h-8 px-3" alt="TBH" />
        <div className="flex-grow border-t border-white" />
      </div>
    </div>
  );
}
