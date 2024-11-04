import { Chart } from "@/components/Chart";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { overviewItems } from "@/lib/constants";
import Image from "next/image";

export default function Home() {
  const table = overviewItems.overviewTables;

  return (
    <main className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 p-4">
      {overviewItems.overviewHead.map((item, index) => (
        <Card key={index} className="col-span-1 rounded-xs">
          <CardHeader>
            <CardDescription>{item.title}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{item.content}</p>
          </CardContent>
          <CardFooter>
            <p>{item.footer}</p>
          </CardFooter>
        </Card>
      ))}
      
      {table.map((table, tableIndex) => (
        <Card key={tableIndex} className="col-span-1 md:col-span-2 bg-white p-0 flex flex-col">
          <CardHeader>
          <CardTitle className="text-lg font-semibold border-b-[1px] border-gray-300 p-2 pl-4">
            {table.tableName}
          </CardTitle>
          </CardHeader>
          <CardContent className="flex">
          <Table className='min-w-[440px] md:min-w-full'>
            <TableBody>
              {table.rows.map((item, rowIndex) => (
                <TableRow className="left-4" key={rowIndex}>
                  <TableCell className="text-center">
                    <div className="flex items-center gap-4">
                      <div>
                        <p>{item.holder.id}</p>
                      </div>
                      <Image src={item.holder.icon} alt="Icon" />
                      <span className="rounded-full h-8 w-8 flex items-center justify-center">
                        <Avatar>
                          <AvatarFallback className='bg-primary-light'>
                            {item.holder.initial}
                          </AvatarFallback>
                        </Avatar>
                      </span>
                      <div>
                        <p className="font-bold">{item.holder.name}</p>
                        <p className="text-sm text-gray-500">
                          {item.holder.username}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell className="text-right">
                    {item.noOfLoan}
                    <span> Loans</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </CardContent>
        </Card>
      ))}
      <div className="col-span-1 md:col-span-2 xl:col-span-4 bg-white">
        <Chart />
      </div>
    </main>
  );
}
