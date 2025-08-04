import ollama
from datetime import datetime

# Define the system prompt
system_prompt = """
You are an AI assistant that generates formal incident reports about littering offenses based on provided data.

## Report Formatting Rules:
- Begin with the date and time of the incident.
- Mention the name of the offender if known, otherwise state 'an unidentified individual'.
- Describe the littering action briefly, specifying what was discarded.
- Include car license plate information if available.
- Mention the location; if unknown, write 'at location: [REDACTED]'.
- State the fine amount and fine status clearly at the end.
- Only use the details provided in the input — do not assume any defaults or invent values.
- Keep the tone formal, factual, and concise in a single paragraph.

Only output the final report — no explanations or bullet points.
"""

# Function to generate a littering report
def generate_report(data):
    # Format date and time (if provided)
    incident_time = data.get("incident_time", "unknown time")
    incident_date = data.get("incident_date", "unknown date")

    # Build summary input string from available data
    input_summary = f"""
Incident Date: {incident_date}
Incident Time: {incident_time}
Offender: {data.get("offender", "Unknown")}
Object Discarded: {data.get("object_discarded", "unknown object")}
Car Plate: {data.get("car_plate", "Not available")}
Location: {data.get("location", "[REDACTED]")}
Fine Amount: {data.get("fine_amount", "Not specified")}
Fine Status: {data.get("fine_status", "Not specified")}
"""

    response = ollama.chat(
        model='qwen2.5:0.5b',
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": input_summary}
        ]
    )
    return response['message']['content']
