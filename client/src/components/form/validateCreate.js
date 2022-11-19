export const validate = (input) => {
    const err = {};
  
    if (! input.name) err.name = "Name required!";
    else if (input.name.length > 40) err.name = "That's not a name, it's a poem. Shorten it pls";
  
    if (! input.minHeight) err.minHeight = 'Minimum height requeired!'
    else if (input.minHeight < 5) err.minHeight = "Come on, I've seen cockroaches larger than 5cm...";
    else if (isNaN(input.minHeight)) err.minHeight = "Minimum height must be a number.";
  
    if (! input.maxHeight) err.maxHeight = 'Maximum height required!'
    else if (input.maxHeight > 70) err.maxHeight = "Is that a dog or Godzilla?";
    else if (isNaN(input.maxHeight)) err.maxHeight = "Maximum height must be a number.";
  
    if (input.minHeight && input.maxHeight && parseInt(input.minHeight) >= parseInt(input.maxHeight)) err.maxHeight = 'Maximum height must be bigger than minimum.'
  
    if (! input.minWeight) err.minWeight = "Minimum weight required!";
    else if (input.minWeight < 1) err.minWeight = "If it weighs less than 1 kg, it's a mouse.";
    else if (isNaN(input.minWeight)) err.minWeight = "Minimum weight must be a number.";
    
    if (! input.maxWeight) err.maxWeight = "Maximum weight required!";
    else if (input.maxWeight > 120) err.maxWeight = "Stop bluffing, must be lighter than 120kg.";
    else if (isNaN(input.maxWeight)) err.maxWeight = "Maximum weight must be a number.";
    
    if (input.minWeight && input.maxWeight && parseInt(input.minWeight) >= parseInt(input.maxWeight)) err.maxWeight = 'Maximum weight must be bigger than minimum.'
  
    if (input.minLifeSpan && input.minLifeSpan < 3) err.minLifeSpan = "Minimum life span must be bigger than 3 years.";
    else if (input.minLifeSpan && isNaN(input.minLifeSpan)) err.minLifeSpan = "Minimum life span must be a number.";
  
    if (input.maxLifeSpan && input.maxLifeSpan > 30) err.maxLifeSpan = "Maximum life span must be smaller than 30 years.";
    else if (input.maxLifeSpan && isNaN(input.maxLifeSpan)) err.maxLifeSpan = "Maximum life span must be a number.";
  
    if (input.minLifeSpan && ! input.maxLifeSpan) err.minLifeSpan = 'Both life spans must be provided!';
    if (! input.minLifeSpan && input.maxLifeSpan) err.maxLifeSpan = 'Both life spans must be provided!';
    
    if (input.minLifeSpan && input.maxLifeSpan && parseInt(input.minLifeSpan) >= parseInt(input.maxLifeSpan)) err.life_span_max = 'Maximum life span must be bigger than minimum.'
  
    return err;
};