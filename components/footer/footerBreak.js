export default function FooterBreak(props) {
  return (
    <div {...props}>
      <div className=" flex items-center">
        <div className="flex-grow border-t border-white" />
        <img src="/icons/tbh.png" className="h-6 px-2" alt="TBH" />
        <div className="flex-grow border-t border-white" />
      </div>
    </div>
  );
}
