type TableLinkProps = {
    id: string;
    entity: string;
    link: string;
};

const TableLink: React.FC<TableLinkProps> = ({ id, entity, link }) => (
    <a href={`${link}/${id}`} style={{ color: "blue", textDecoration: "underline" }}>View {entity}</a>
);

export default TableLink;
