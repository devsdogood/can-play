type TabPanelProps = {
    children?: React.ReactNode;
    index: number;
    value: number;
};
  
const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
        >
            {value === index && children}
        </div>
    );
}

export default TabPanel;
