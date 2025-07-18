import InvoicesHeader from "@/app/components/InvoicesPage/InvoicesHeader/InvoicesHeader";
import InvoicesTable from "@/app/components/InvoicesPage/InvoicesTable/InvoicesTable";

export default function page() {
  return (
    <div className="flex flex-col gap-[1rem] pt-[25px] pb-[53px] px-[53px] justify-center items-center">
      <InvoicesHeader />
      <InvoicesTable />
    </div>
  );
}
