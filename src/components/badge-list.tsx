import { Badge } from "./ui/badge";
import { getBadgeClass } from "./badge-utils";

interface BadgeListProps {
  status: string;
  priority: string;
}

const BadgeList: React.FC<BadgeListProps> = ({ status, priority }) => (
  <div className="mt-3">
    <Badge className={getBadgeClass("status", status)}>{status}</Badge>
    <Badge className={getBadgeClass("priority", priority)}>{priority}</Badge>
  </div>
);

export default BadgeList;
