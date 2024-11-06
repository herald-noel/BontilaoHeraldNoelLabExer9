# Encoding Scheme Visualizer

A web application for visualizing different binary encoding schemes: **NRZ-L**, **NRZ-I**, **Bipolar AMI**, **Pseudoternary**, **Manchester**, and **Differential Manchester**. This tool helps users understand how binary data is represented in various encoding formats by displaying visual waveforms for each encoding method based on user input.

## Supported Encoding Schemes

1. **NRZ-L (Non-Return to Zero Level)**

   - Encodes binary 0 as one voltage level and binary 1 as another.

2. **NRZ-I (Non-Return to Zero Inverted)**

   - Inverts the signal level on binary 1; binary 0 keeps the current level.

3. **Bipolar AMI (Alternate Mark Inversion)**

   - Represents binary 0 as zero voltage and alternates positive and negative voltages for binary 1s.

4. **Pseudoternary**

   - Opposite of Bipolar AMI, where binary 1 is zero voltage, and binary 0 alternates positive and negative.

5. **Manchester**

   - Combines clock and data into a single line; binary 1 transitions from low to high and binary 0 transitions from high to low within a bit period.

6. **Differential Manchester**
   - Similar to Manchester but includes differential encoding; each bit period begins with a transition, and binary 1 is represented by no transition at the end of the period, while binary 0 has a transition.

## Installation

To set up the application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/encoding-scheme-visualizer.git
   cd encoding-scheme-visualizer
   ```

2. Clone the repository:

   ```bash
   npm install
   ```

3. Run the app in development mode with Vite:

   ```bash
   npm run dev
   ```

   The application should now be accessible at `http://localhost:3000`.
