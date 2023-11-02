export const starting_nested_logit = (p1, p2, alpha1, alpha2, beta1, beta2, sigma) => {
    denom = 1;
    s1 = (Math.exp((alpha1 + (beta1 * p1))/sigma) * ((Math.exp((alpha1 + (beta1 * p1))/sigma)) + Math.exp((alpha2 + (beta2 * p2))/sigma))**(sigma - 1)) / denom;
    s2 = (Math.exp((alpha2 + (beta2 * p2))/sigma) * ((Math.exp((alpha1 + (beta1 * p1))/sigma)) + Math.exp((alpha2 + (beta2 * p2))/sigma))**(sigma - 1)) / denom;
    result = [s1, s2];
    return result;
}

export const nested_logit = (p1, p2, alpha1, alpha2, beta1, beta2, sigma) => {
    denom = 1 + (Math.exp((alpha1 + (beta1 * p1))/sigma) + Math.exp((alpha2 + (beta2 * p2)) / sigma))**sigma;
    s1 = (Math.exp((alpha1 + (beta1 * p1))/sigma) * ((Math.exp((alpha1 + (beta1 * p1))/sigma)) + Math.exp((alpha2 + (beta2 * p2))/sigma))**(sigma - 1)) / denom;
    s2 = (Math.exp((alpha2 + (beta2 * p2))/sigma) * ((Math.exp((alpha1 + (beta1 * p1))/sigma)) + Math.exp((alpha2 + (beta2 * p2))/sigma))**(sigma - 1)) / denom;
    result = [s1, s2];
    return result;
}

export const demand_function_logit = (p1, p2, alpha1, alpha2, beta1, beta2, sigma) => {     
    denom = 1 + Math.exp(alpha1 +(beta1 * p1)) + Math.exp(alpha2 + (beta2 * p2));     
    s1 = Math.exp(alpha1 +(beta1p1)) / denom;     s2 = Math.exp(alpha2 +(beta2p2)) / denom;     
    result = [s1, s2];     
    return result;   
}

export const profit = (p1, p2, d1, d2) => {
    total = (p1 * d1) + (p2 * d2);
    return total;
}