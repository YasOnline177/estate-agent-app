import "@testing-library/jest-dom";

// Fix for TextEncoder not defined in Jest environment
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
