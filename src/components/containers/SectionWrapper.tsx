type SectionWrapperProps = {
  id: string;
  children: React.ReactNode;
};

const SectionWrapper = ({ id, children }: SectionWrapperProps) => {
  return (
    <section
      key={id}
      id={id}
      className="container flex flex-col items-center justify-center gap-12 px-4 py-16 "
    >
      {children}
    </section>
  );
};

export default SectionWrapper;
