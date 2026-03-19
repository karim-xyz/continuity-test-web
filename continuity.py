from sympy import symbols, limit, Reals
from sympy.calculus.util import continuous_domain
from sympy.parsing.latex import parse_latex

def verif(f: str, c: float):
    x = symbols("x")
    
    f = parse_latex(f)
    
    domain = continuous_domain(f, x, Reals)
    
    f_c = f.subs(x, c)
    lim_f_x = limit(f, x, c)

    #f(c) exists
    cond1 = c in domain
    #f has a limit as x->c
    cond2 = limit(f, x, c, "+") == limit(f, x, c, "-")
    #the limit equals the function value
    cond3 = f_c == lim_f_x
    
    return (cond1 and cond2 and cond3)

def is_latex(f: str):
    try:
        parse_latex(f)
        return True
    except:
        return False

