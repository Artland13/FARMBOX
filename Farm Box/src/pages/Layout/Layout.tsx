import Header from '@components/Header';
import NavBar from '@components/NavBar';

interface IProps {
  children: React.ReactNode;
}

export default function Layout({ children }: IProps) {
  return (
    <div>
      <Header />
      <NavBar />
      <main>{children}</main>
    </div>
  );
}
