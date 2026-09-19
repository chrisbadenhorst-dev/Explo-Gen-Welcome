interface GreetingProps {
  applicantName: string;
}

export function Greeting({ applicantName }: GreetingProps) {
  const firstName = applicantName.split(" ")[0];

  return (
    <h1 className="font-display text-3xl font-semibold text-brand-white sm:text-4xl">
      Dear {firstName},
    </h1>
  );
}
