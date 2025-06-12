export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-8 text-center text-muted-foreground">
      <div className="container mx-auto px-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} ComuniArte. Todos los derechos reservados.</p>
        <p className="text-xs mt-2">Conectando innovadores y creadores de todo el mundo.</p>
      </div>
    </footer>
  );
}
