from collections import defaultdict


class DashboardService:
    @staticmethod
    async def format_report_dates(data):
        formatted_data = defaultdict(lambda: [
            {"month": "Jan", "count": 0}, {"month": "Feb", "count": 0}, {"month": "Mar", "count": 0},
            {"month": "Apr", "count": 0}, {"month": "May", "count": 0}, {"month": "Jun", "count": 0},
            {"month": "Jul", "count": 0}, {"month": "Aug", "count": 0}, {"month": "Sep", "count": 0},
            {"month": "Oct", "count": 0}, {"month": "Nov", "count": 0}, {"month": "Dec", "count": 0}
        ])
        
        month_map = {1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 
                     7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec"}
        
        for (dt,) in data:
            year = dt.year
            month = dt.month
            
            for entry in formatted_data[year]:
                if entry["month"] == month_map[month]:
                    entry["count"] += 1
                    break
        
        return dict(formatted_data)