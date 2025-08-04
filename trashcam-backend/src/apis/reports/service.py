from typing import List, Dict

class ReportService:
    
    @staticmethod
    def format_list_of_reports(result: List[tuple]) -> List[Dict]:
        def format_location(location: str) -> str:
            return ", ".join(location.split(", ")[:4]) if location else ""

        return [
            {
                "name": row[0] or "",
                "cnic": row[1] or "",
                "location": format_location(row[4]),
                "fine": f"Rs {row[5]}" if row[5] else "",
                "status": row[6] or "",
                "reportid": row[7] or "",
            }
            for row in result
        ] if result else [
            {
                "name": "", "cnic": "", "location": "", "fine": "", "status": "", "reportid": ""
            }
        ]

    

    @staticmethod
    def format_report_details(result: List[tuple]) -> List[Dict]:
        return [
            {
                "offender_name": row[0] or "",
                "cnic": row[1] or "",
                "address": row[2] or "",
                "location_of_offence": row[3] or "",
                "time_of_offence": row[4] or "",
                "date_of_offence": row[5] or "",
                "fine_issued": f"Rs {row[6]}" if row[6] else "",
                "info_details": row[7] or "",
                "total_offences": row[8] or 0
            }
            for row in result
        ] if result else [{
            "offender_name": "", "cnic": "", "address": "", "location_of_offence": "",
            "time_of_offence": "", "date_of_offence": "", "fine_issued": "", "info_details": "",
            "total_offences": 0
        }]
    


    